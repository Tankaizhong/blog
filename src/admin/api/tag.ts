import service from '@/utils/axios'
import { TagType } from '@/types/model'

export const getAllTags = () => {
  return service.post('tag/fetchAllTags')
}
export const deleteTag = (tagID) => {
  return service.post('/tag/deleteTag', {
    tagID,
  })
}
export const addTag = (tagDate: TagType) => {
  // console.log(tagDate)
  return service.post('tag/addTag', {
    TagName: tagDate.TagName,
    TagDescription: tagDate.TagDescription,
  })
}

export const updateTag = (tagDate: TagType) => {
  // console.log(tagDate)
  return service.post('tag/updateTag', { tagDate })
}
