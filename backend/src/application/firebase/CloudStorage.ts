import {
  FirebaseStorage,
  getDownloadURL,
  getStorage,
  ref,
  UploadResult,
  uploadString,
} from "firebase/storage";
import { EFileStringFormat } from "../enumerators/EFileStringFormat";
import { IFile } from "../interfaces/IFile";
import firebase from "../../infrastructure/firebase/firebase";
import { EPictureFolder } from "../enumerators/EPictureFolder";

class CloudStorage {
  private readonly storage: FirebaseStorage = firebase.storage;

  async upload(
    file: IFile,
    folder: EPictureFolder,
    format: EFileStringFormat = EFileStringFormat.dataUrl
  ): Promise<UploadResult> {
    const storageRef = ref(this.storage, `${folder}/${file.name}.jpg`);
    return await uploadString(storageRef, file.data, format);
  }

  async getDownloadURL(
    filename: string,
    folder: EPictureFolder
  ): Promise<string> {
    const storageRef = ref(this.storage, `${folder}/${filename}.jpg`);
    return await getDownloadURL(storageRef);
  }
}

export default new CloudStorage();
