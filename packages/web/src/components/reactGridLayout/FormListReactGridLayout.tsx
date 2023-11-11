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
import ErrorLoading from '../common/ErrorLoading';
import ListHeader2 from '../common/ListHeader2';

interface IProps {
  hideHeader?: boolean;
  customLink?: (form: any) => string;
  selectedForm?: string;
  isWorkflow?: boolean;
}
const layouts = [
  { i: 'a', x: 0, y: 500, w: 100, h: 5, static: true },
  { i: 'b', x: 1, y: 500, w: 300, h: 2, minW: 2, maxW: 4 },
  { i: 'c', x: 500, y: 1000, w: 100, h: 2 },
];
export default function FormListReactGridLayout({
  hideHeader,
  customLink,
  selectedForm,
  isWorkflow,
}: IProps): any {
  const { data, error, loading, state, setState } = useGetForms({ isWorkflow });
  // console.log(data);
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/ban-types
  const [newitems, setNewitems] = useState([]);
  const [listToPopulate, setListToPopulate] = useState([]);

  const userForm = useSelector(({ setting }: any) => setting.userForm);
  const [layout, setLayout] = useState([]);

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
    console.log(newitems);
  };

  useEffect(() => {
    const matchingresult = data?.getForms?.data?.map((form, i) => {
      if (newitems.some((items2) => items2 === form._id)) {
        return form;
      }
    });

    setListToPopulate(matchingresult);
  }, [newitems]);

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
                  style={{ backgroundColor: 'violet' }}
                  draggable
                  data-grid={{ x: 1, y: 10 + i, w: 100, h: 2, minW: 2, maxW: 4, resizable: false }}
                >
                  <ListItemText
                    primary={form?.name}
                    secondary={`${getUserAttributes(userForm, form?.createdBy)?.firstName} ${
                      getUserAttributes(userForm, form?.createdBy)?.lastName
                    } ${getCreatedAtDate(form?.createdAt)}`}
                  />
                </div>
              )
            );
          })}
        </ResponsiveGridLayout>
      </Paper>
    </>
  );
}
