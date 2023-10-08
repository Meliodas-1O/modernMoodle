import {getAll as serviceGetAll} from '../services/chapters_service';

export function getAll() : string {
    console.log("(controller)")
    return serviceGetAll()
}