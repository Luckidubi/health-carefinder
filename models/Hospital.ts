import { Schema, model, models, Document } from "mongoose";

const HospitalSchema = new Schema<HospitalProps>({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  road: {
    type: String,
    default: "",
  },
  city: {
    type: String,
  },
  phone: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: "",
  },
  state: {
    type: String,
    required: true,
  },

  country: {
    type: String,
  },
  postalcode: {
    type: String,
    default: "",
  },
  photo: {
    type: String,
  },
  latitude: String,
  longitude: String,
  place_id: String,
  content: {
    type: String,

  }
});

export interface HospitalProps extends Document {
  name: string;
  address: string;
  phone: string;
  email: string;
  state: string;
  postalcode: string;
  photo: string;
  city: string;
  country: string;
  latitude: string;
  longitude: string;
  place_id: string;
  road: string;
  content: string;
}

const Hospital = models.Hospital || model("Hospital", HospitalSchema);

export default Hospital;
