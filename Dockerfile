# Debian-based (not alpine): agent-twitter-client pulls in @roamhq/wrtc, a
# native module with prebuilt glibc binaries only - it fails to load on musl.

# Install dependencies
FROM node:20-slim AS deps
WORKDIR /app
# npm@latest (12.x) requires Node >=22; this image runs Node 20, so pin to
# the newest npm major that still supports it.
RUN npm install -g npm@11
COPY package.json package-lock.json ./
RUN npm ci

# Build the Next.js app
FROM node:20-slim AS builder
WORKDIR /app
RUN npm install -g npm@11
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Next's file tracer over-includes: `typescript` is a devDependency it pulls
# in defensively even though nothing at runtime needs it, and sharp's native
# binary gets traced for both glibc and musl even though only one ever runs.
# Safe to prune post-build since the build itself is already done.
RUN rm -rf .next/standalone/node_modules/typescript \
    .next/standalone/node_modules/@img/sharp-libvips-linuxmusl-x64 \
    .next/standalone/node_modules/@img/sharp-linuxmusl-x64

# Final runtime image. Distroless instead of node:20-slim: same glibc (so the
# wrtc/sharp native binaries above still load) but ~120MB smaller since it
# skips the shell, package manager and other OS tooling this app never uses.
FROM gcr.io/distroless/nodejs20-debian12:nonroot AS runner
WORKDIR /app

# Standalone output traces exactly which files/node_modules entries the
# server actually needs at runtime, instead of shipping the whole
# (dev-dependency-laden) node_modules tree. Static assets and public/ are
# excluded from the trace and must be copied in separately.
COPY --from=builder --chown=65532:65532 /app/public ./public
COPY --from=builder --chown=65532:65532 /app/.next/standalone ./
COPY --from=builder --chown=65532:65532 /app/.next/static ./.next/static

ENV NODE_ENV=production
EXPOSE 3000
ENV PORT=3000

# Distroless's nodejs image entrypoint is already `node`; this is its argument.
CMD ["server.js"]
