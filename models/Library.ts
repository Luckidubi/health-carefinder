import { Schema, model, models, Document } from "mongoose";

const LibrarySchema = new Schema<LibraryProps>({
  id: {
    type: String,
  },
  hospital_name: {
    type: String,
    required: true,
  },
  hospital_address: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
  },

  place_id: {
    type: String,
  },
  hospital_photo: {
    type: String,
    default: "",
  },
});

export interface LibraryProps extends Document {
  id: string;
  hospital_name: string;
  hospital_address: string;
  user_id: string;
  place_id: string;
  hospital_photo: string;
}

const Library = models.Library || model("Library", LibrarySchema);

export default Library;
