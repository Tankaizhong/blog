import service from '@/utils/axios'
import { TagModal } from '@/types/model'

export const getAllTags = (userInfo) => {
  return service.post('tag/fetchAllTags')
}
export const deleteTag = (tagID) => {
  return service.post('/tag/deleteTag', {
    tagID,
  })
}
export const addTag = (tagDate: TagModal) => {
  // console.log(tagDate)
  return service.post('tag/addTag', {
    TagName: tagDate.TagName,
    TagDescription: tagDate.TagDescription,
  })
}

export const updateTag = (tagDate: TagModal) => {
  console.log(tagDate)
  return service.post('tag/updateTag', { tagDate })
}
