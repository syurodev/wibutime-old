export function checkUserIdExistsInFavotiteArray(arr: { userId: string; }[], userId: string) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].userId === userId) {
      return true;
    }
  }
  return false;
}