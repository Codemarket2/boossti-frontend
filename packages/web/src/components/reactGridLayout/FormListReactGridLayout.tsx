/* eslint-disable no-console */
/* eslint-disable react/jsx-wrap-multilines */
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import { useGetForms } from '@frontend/shared/hooks/form';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Paper from '@mui/material/Paper';
import ListItemText from '@mui/material/ListItemText';
import { getCreatedAtDate } from '@frontend/shared/utils/date';
import { getUserAttributes } from '@frontend/shared/hooks/user/getUserForm';
import { useSelector } from 'react-redux';
import ResponsiveGridLayout, { WidthProvider, Responsive } from 'react-grid-layout';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import GridOnIcon from '@mui/icons-material/GridOn';
// import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ErrorLoading from '../common/ErrorLoading';
import ListHeader2 from '../common/ListHeader2';
import FormFields from '../form2/FormFields';
import Form from '../form2/Form';
import CRUDMenu from '../common/CRUDMenu';
import ResponseList from '../response/ResponseList';

interface IProps {
  hideHeader?: boolean;
  customLink?: (form: any) => string;
  selectedForm?: string;
  isWorkflow?: boolean;
}

export default function FormListReactGridLayout({
  hideHeader,
  customLink,
  selectedForm,
  isWorkflow,
}: IProps): any {
  const { data, error, loading, state, setState } = useGetForms({ isWorkflow });

  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/ban-types
  const [newitems, setNewitems] = useState([]);
  const [listToPopulate, setListToPopulate] = useState([]);

  const userForm = useSelector(({ setting }: any) => setting.userForm);
  const [layout1, setLayout] = useState([]);

  const onDrop = (layout, layoutItem, event) => {
    // Retrieve the data from the event
    const itemData = event.dataTransfer.getData('text/plain');
    // eslint-disable-next-line no-console

    // Replace the placeholder identifier with the actual data
    const newItem = {
      ...layoutItem,
      i: itemData, // Replace '__dropping-elem__' with actual item data
    };

    // Add the new item to the layout
    setLayout((currentLayout) => [...currentLayout, newItem]);
    setNewitems((prev) => [...prev, itemData]);
  };

  /*   useEffect(() => {
    const matchingresult = data?.getForms?.data?.map((form, i) => {
      if (newitems.some((items2) => items2 === form._id)) {
        return form;
      }
    });

    setListToPopulate(matchingresult);
  }, [newitems]); */

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  return (
    <>
      <ListHeader2
        hideBreadcrumbs={hideHeader}
        search={state.search}
        onSearchChange={(newSearch) => setState({ ...state, search: newSearch })}
        searchLoading={loading}
        handleAddNew={() => router.push(`/${isWorkflow ? 'workflow' : 'form'}/new`)}
        addIconButton
        addIconLabel={`Create new ${isWorkflow ? 'workflow' : 'form'}`}
      >
        <Typography color="textPrimary">Forms</Typography>
      </ListHeader2>
      <Paper variant="outlined" sx={{ display: 'flex' }}>
        {error || !data || !data.getForms ? (
          <ErrorLoading error={error} />
        ) : (
          <List dense disablePadding>
            {data.getForms.data.map((form, i) => (
              <Fragment key={form._id}>
                {i > 0 && <Divider />}

                {/* <Link href={customLink ? customLink(form) : `/form/${form.slug}`}> */}
                <ListItem button selected={form?.slug === selectedForm}>
                  <div
                    key={i}
                    style={{ backgroundColor: 'violet' }}
                    draggable
                    onDragStart={(e) => e.dataTransfer.setData('text/plain', form._id)}
                  >
                    <ListItemText
                      primary={form.name}
                      secondary={`${getUserAttributes(userForm, form.createdBy)?.firstName} ${
                        getUserAttributes(userForm, form.createdBy)?.lastName
                      } ${getCreatedAtDate(form.createdAt)}`}
                    />
                  </div>
                  <div>
                    <ResponseList form={form} workflowId={null} showOnlyMyResponses={false} />
                  </div>
                </ListItem>
                {/*   </Link> */}
              </Fragment>
            ))}
          </List>
        )}

        <ResponsiveGridLayout
          className="layout"
          cols={12}
          rowHeight={30}
          width={800}
          isDraggable
          isDroppable
          onDrop={onDrop}
          style={{ border: '1px solid', width: '50vw', height: '100vh' }}
          onLayoutChange={(newLayout) => setLayout(newLayout)}
        >
          {listToPopulate.map((form, i) => {
            return (
              form && (
                <div
                  key={i}
                  style={{ backgroundColor: 'violet', display: 'flex' }}
                  draggable
                  data-grid={{
                    x: 1,
                    y: 10 + i,
                    w: 100,
                    h: 2,
                    minW: 2,
                    maxW: 4,
                    resizable: false,
                  }}
                >
                  <ListItemText
                    primary={form?.name}
                    secondary={`${getUserAttributes(userForm, form?.createdBy)?.firstName} ${
                      getUserAttributes(userForm, form?.createdBy)?.lastName
                    } ${getCreatedAtDate(form?.createdAt)}
                    
                    
                    `}
                  />

                  <div style={{ height: '25px' }} onClick={handleClick}>
                    <MoreVertIcon />
                  </div>
                </div>
              )
            );
          })}
        </ResponsiveGridLayout>
      </Paper>
      {/* <CRUDMenu
            hideDelete={state.field?.options?.default}
            show={state.showMenu}
            onClose={() => setState(initialValues)}
            onDelete={() => {
              setFields(fields.filter((field) => field._id !== state.field._id));
              setState(initialValues);
            }}
            onEdit={() => {
              setState({ ...state, showMenu: null, showForm: true });
            }}
          >
            <MenuItem onClick={() => setState({ ...state, showMenu: false, editStyle: true })}>
              <ListItemIcon className="mr-n3">
                <EditIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Edit Style" />
            </MenuItem>
            <MenuItem onClick={() => setState({ ...state, showMenu: false, editRules: true })}>
              <ListItemIcon className="mr-n3">
                <EditIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Rules" />
            </MenuItem>
            <MenuItem onClick={() => setState({ ...state, showMenu: false, editGrid: true })}>
              <ListItemIcon className="mr-n3">
                <GridOnIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Grid" />
            </MenuItem>
            {state.field?.fieldType === 'form' && (
              <>
                {state.field?.form?._id && (
                  <>
                    <MenuItem
                      onClick={() => setState({ ...state, showMenu: false, editForm: true })}
                    >
                      <ListItemIcon className="mr-n3">
                        <EditIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Edit Form" />
                    </MenuItem>
                    <MenuItem
                      onClick={() =>
                        setState({ ...state, showMenu: false, showFormSettings: true })
                      }
                    >
                      <ListItemIcon className="mr-n3">
                        <SettingsIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Form Settings" />
                    </MenuItem>
                  </>
                )}
              </>
            )}
          </CRUDMenu> */}
    </>
  );
}
