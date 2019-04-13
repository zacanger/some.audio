# unused -- deploying in docker doesn't work yet

FROM mhart/alpine-node:10
ENV appdir /app
# RUN addgroup -g 1000 -S node && \
  # adduser -u 1000 -S node -G node
WORKDIR ${appdir}
COPY --chown=node:node . .
# USER node
ENV NODE_ENV=production \
    TERM=linux \
    PORT=3000
EXPOSE 3000
HEALTHCHECK --interval=30s \
    --timeout=2s \
    --start-period=10s \
    --retries=10 \
    CMD node ${appdir}/scripts/healthcheck.js
CMD ["node", "."]
