import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addCategoryAPI, deleteCategoryAPI, getAllCategoryAPI, updateCategoryAPI } from "../../services/category.service";

// hàm lấy thông tin Category
export const getAllCategory: any = createAsyncThunk("classify/getAllCategory", getAllCategoryAPI);

// hàm xóa thông tin Category
export const deleteCategory: any = createAsyncThunk("classify/deleteCategory", deleteCategoryAPI);

// hàm thêm thông tin Category
export const addCategory: any = createAsyncThunk(
    "classify/addCategory", addCategoryAPI
);

// hàm cập nhật Category
export const updateCategory: any = createAsyncThunk(
    "classify/updateCategory", updateCategoryAPI
);

const categoryReducer = createSlice({
    name: "classify",
    initialState: {
        classify: [] // Đây là nơi bạn lưu trữ các danh mục
    },
    reducers: {
        // chứa action
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllCategory.pending, (state, action) => {
                console.log('chờ call API');
            })
            .addCase(getAllCategory.fulfilled, (state, action) => {
                state.classify = action.payload;
            })
            .addCase(getAllCategory.rejected, (state, action) => {
                console.log('thất bại');
            })
            // thêm
            .addCase(addCategory.fulfilled, (state: any, action: any) => {
                state.classify.push(action.payload);
            })
            // xóa
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.classify = state.classify.filter((category: any) => category.id !== action.meta.arg);
            })
            // cập nhật
            .addCase(updateCategory.fulfilled, (state: any, action) => {
                const index = state.classify.findIndex((item: any) => { // Sửa `state.users` thành `state.classify`
                    return item.id === action.payload.id;
                });
                if (index !== -1) {
                    state.classify[index] = action.payload; // Cập nhật danh mục đã chỉnh sửa
                }
            });
    }
});

export default categoryReducer.reducer;
