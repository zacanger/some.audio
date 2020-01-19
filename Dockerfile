# unused -- deploying in docker doesn't work yet

FROM node:12-alpine
ENV appdir /app
WORKDIR ${appdir}
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
