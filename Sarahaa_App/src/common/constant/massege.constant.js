const generateMessage = (value) => ({
  alreadyExist: `${value} already exists`,
  notFound: `${value} not found`,
  invalid: `${value} is invalid`,
  created: `${value} created successfully`,
  updated: `${value} updated successfully`,
  deleted: `${value} deleted successfully`,
  failToCreate: `Failed to create ${value}`,
  failToUpdate: `Failed to update ${value}`,
  failToDelete: `Failed to delete ${value}`,
});
export const Message = {
  user: generateMessage("user"),
  comment: generateMessage("Comment"),
  message: generateMessage("Message"),
};
