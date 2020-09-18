# stage - build
FROM golang:1.14.4-stretch as build
WORKDIR /code
# copy package manifest(less-frequent changing layer)
COPY go.mod go.sum ./
RUN go mod download
# copy code (frequent changing layer)
COPY . .
# generate binary artifact
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o /go/bin/todo
RUN ls -lh /go/bin

# stage - release
# FROM gcr.io/distroless/base-debian10 as release
FROM alpine:3.12 as release
COPY --from=build /go/bin/todo /bin/todo
RUN ls -lh /bin/todo
EXPOSE 8080
ENTRYPOINT ["todo"]