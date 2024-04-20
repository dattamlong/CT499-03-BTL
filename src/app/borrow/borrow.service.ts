import { IBorrowDocument } from './borrow.interface';
import { BorrowModel } from './borrow.model';

const borrowService = {
  getAllBorrows: async (search: string) => {
    let query = {};
    if (search) {
      query = {
        $text: { $search: search },
      };
    }

    return await BorrowModel.find(query);
  },

  getBorrowByReaderId: async (readerId: string) => {
    console.log(readerId);
    return await BorrowModel.find({ reader: readerId });
  },

  getBorrowById: async (id: string) => {
    return await BorrowModel.findById(id);
  },

  createBorrow: async (data: IBorrowDocument) => {
    return (await BorrowModel.create(data)) as IBorrowDocument;
  },

  updateBorrow: async (id: string, info: IBorrowDocument) => {
    return (await BorrowModel.findByIdAndUpdate(id, info, { new: true })) as IBorrowDocument;
  },

  deleteBorrow: async (id: string) => {
    return await BorrowModel.findByIdAndDelete(id);
  },
};

export default borrowService;
