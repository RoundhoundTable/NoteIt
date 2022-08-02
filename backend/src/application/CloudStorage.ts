import {
  FirebaseStorage,
  getDownloadURL,
  getStorage,
  ref,
  UploadResult,
  uploadString,
} from "firebase/storage";
import { EFileStringFormat } from "./enumerators/EFileStringFormat";
import { IFile } from "./interfaces/IFile";
import { app } from "../infrastructure/cloud/firebase";

class CloudStorage {
  private readonly storage: FirebaseStorage;

  constructor() {
    this.storage = getStorage(app);
  }

  async upload(
    file: IFile,
    format: EFileStringFormat = EFileStringFormat.base64
  ): Promise<UploadResult> {
    const storageRef = ref(this.storage, `profile-pictures/${file.name}.jpg`);
    return await uploadString(storageRef, file.data, format);
  }

  async getDownloadURL(filename: string): Promise<string> {
    const storageRef = ref(this.storage, `profile-pictures/${filename}.jpg`);
    return await getDownloadURL(storageRef);
  }
}

export default new CloudStorage();
