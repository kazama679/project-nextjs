export interface Product {
    id: number,
    name: string,
    status: string
    category: string,
    price: number
    date: string
    description: string
    stock: number
    image: string
    created_at: string // Thời gian được tạo, Mặc định là ngày hiện tại, format dạng dd/mm/yyyy
    updated_at: string // Thời gian cập nhật gần nhất, Mặc định là ngày hiện tại, format dạng dd/mm/yyyy
}