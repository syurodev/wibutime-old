type CategoryContents = {
  id: string,
  name: string,
  contents: {
    id: string,
    name: string,
    type: ContentType,
    image: {
      key: string,
      url: string
    }
  }[],
}