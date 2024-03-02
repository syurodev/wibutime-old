interface Category {
  id: string;
  name: string;
}

interface ExistingCategory {
  categoryId: string;
}

export function compareCategories(existingCategories: ExistingCategory[], categories: Category[]): { added: string[], removed: string[] } {
  const added: string[] = [];
  const removed: string[] = [];

  // Tạo một mảng chứa tất cả các id của các category trong categories
  const categoryIds = categories.map(category => category.id);

  // Kiểm tra các phần tử trong existingCategories
  for (const existingCategory of existingCategories) {
    // Kiểm tra xem categoryId của mỗi existingCategory có trong categoryIds không
    const index = categoryIds.indexOf(existingCategory.categoryId);
    if (index === -1) {
      // Nếu không tìm thấy, tức là category này đã bị xoá
      removed.push(existingCategory.categoryId); // Thêm vào mảng removed
    } else {
      // Nếu tìm thấy, loại bỏ id của category này khỏi categoryIds
      categoryIds.splice(index, 1);
    }
  }

  // Bây giờ các phần tử còn lại trong categoryIds là các phần tử mới
  for (const categoryId of categoryIds) {
    const category = categories.find(cat => cat.id === categoryId);
    if (category) {
      added.push(category.id); // Thêm vào mảng added
    }
  }

  return { added, removed };
}