import React from 'react';
import { Delete, Edit } from '@material-ui/icons';

export default function EditDeleteIconRenderer(props) {
  return <div className="edit-delete-renderer">{props.type === 'edit' ? <Edit /> : <Delete />}</div>;
}
