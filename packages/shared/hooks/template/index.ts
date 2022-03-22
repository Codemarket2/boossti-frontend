export {
  useCRUDTemplates,
  useGetTemplates,
  useGetTemplateBySlug,
  useDeleteTemplate,
  useCreateTemplate,
} from './templates';
export {
  useCRUDPages,
  useGetPagesByTemplate,
  useGetPageBySlug,
  useDeletePage,
  useCreatePage,
  useGetpageFieldMentions,
  // useGetTemplateFieldMentions,
  useGetPageById,
} from './pages';
export { useMention } from './mention';
export { useUpdateTemplate } from './updateTemplate';
export { useUpdatePageFields } from './updatePage';
export { usePublishTemplate } from './publishTemplate';
export { usePublishPage } from './publishPage';
export { useMenuTemplates } from './getMenuTemplates';
