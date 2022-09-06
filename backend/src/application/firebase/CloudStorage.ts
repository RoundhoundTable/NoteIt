import {
  FirebaseStorage,
  getDownloadURL,
  ref,
  StorageError,
  uploadString,
} from "firebase/storage";
import { EFileStringFormat } from "../enumerators/EFileStringFormat";
import firebase from "../../infrastructure/firebase/firebase";
import { v4 } from "uuid";

class CloudStorage {
  private static readonly storage: FirebaseStorage = firebase.storage;

  static async upload(
    data: string,
    folder: "notebooks" | "users",
    name: string
  ): Promise<string> {
    const storageRef = ref(this.storage, `${folder}/${name}/${v4()}`);
    const result = await uploadString(storageRef, data, "data_url");
    const downloadUrl = await getDownloadURL(result.ref);

    return downloadUrl;
  }
}

export default CloudStorage;
