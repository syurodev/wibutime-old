function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function getAllUserImage(userProfile: UserProfile): string[] {
  const animeImages: string[] = [];
  const mangaImages: string[] = [];
  const lightnovelImages: string[] = [];

  // Lấy ảnh từ AnimeQuickInformation
  userProfile.animes.forEach((anime) => {
    let count = 0;
    if (anime.seasons) {
      anime.seasons.forEach((season) => {
        if (season.image && season.image.url && count < 2) {
          animeImages.push(season.image.url);
          count++;
        }
      });
    }
  });

  // Lấy ảnh từ MangaQuickInformation
  userProfile.mangas.forEach((manga) => {
    if (manga.image && manga.image.url && mangaImages.length < 2) {
      mangaImages.push(manga.image.url);
    }
  });

  // Lấy ảnh từ LightnovelQuickInformation
  userProfile.lightnovels.forEach((lightnovel) => {
    if (lightnovel.image && lightnovel.image.url && lightnovelImages.length < 2) {
      lightnovelImages.push(lightnovel.image.url);
    }
  });

  let combinedImages: string[] = [...animeImages, ...mangaImages, ...lightnovelImages];
  // combinedImages = shuffleArray(combinedImages);

  let remainingImages = 6 - combinedImages.length;
  if (remainingImages > 0) {
    const additionalAnimeImages = animeImages.slice(0, remainingImages).filter(url => !combinedImages.includes(url));
    combinedImages.push(...additionalAnimeImages);
  }

  // Kiểm tra và lấy thêm ảnh từ Manga nếu cần
  remainingImages = 6 - combinedImages.length;
  if (remainingImages > 0) {
    const additionalMangaImages = mangaImages.slice(0, remainingImages).filter(url => !combinedImages.includes(url));
    combinedImages = [...combinedImages, ...additionalMangaImages];
  }

  // Kiểm tra và lấy thêm ảnh từ Lightnovel nếu cần
  remainingImages = 6 - combinedImages.length;
  if (remainingImages > 0) {
    const additionalLightnovelImages = lightnovelImages.slice(0, remainingImages).filter(url => !combinedImages.includes(url));
    combinedImages = [...combinedImages, ...additionalLightnovelImages];
  }

  remainingImages = 6 - combinedImages.length;
  if (remainingImages > 0) {
    for (let i = 1; i <= remainingImages; i++) {
      combinedImages.push(`/images/up${i}.webp`);
    }
  }

  // combinedImages = shuffleArray(combinedImages.slice(0, 6));
  // Trả về tối đa 6 ảnh
  return combinedImages.slice(0, 6);
}
