FROM golang:alpine as builder

WORKDIR $GOPATH/src/github.com/turnon/yiny

COPY go.mod .
COPY app.go .

RUN apk add --no-cache git \
    && export GO111MODULE=on \
    && go get ./... \
    && go build -o /yiny \
    && apk del git

FROM alekzonder/puppeteer@sha256:a1cb72db14501d45b4ecdb4b1875a2ef4582ca9a810fe40844b1851fe0d99f69

COPY script.js ./
COPY --from=builder /yiny .

ENTRYPOINT ["dumb-init", "--", "./yiny"]