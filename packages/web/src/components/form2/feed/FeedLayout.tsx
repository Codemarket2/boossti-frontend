import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { IconButton, Paper, Tooltip } from '@mui/material';
import Grid from '@mui/material/Grid';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useRouter } from 'next/router';
import React, { ReactNode, useEffect, useState } from 'react';
import FormList from '../FormList';
import FeedWrapper from './FeedWrapper';

interface IFeedLayout {
  children: ReactNode;
}

export default function FeedLayout({ children }: IFeedLayout) {
  const [formSlug, setFormSlug] = useState('');
  const [selectedTab, setSelectedTab] = useState('forms');
  const [leftMenuOpen, setLeftMenuOpen] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (router.query?.form) {
      setFormSlug(router.query?.form?.toString());
      setSelectedTab(
        router.query?.form?.toString() === 'work-flow-diagram' ? 'workflows' : 'forms',
      );
    } else {
      setFormSlug('');
      setSelectedTab('forms');
    }
  }, [router.query?.form]);

  return (
    <Grid container spacing={0.5}>
      <Grid item xs={12} sm={leftMenuOpen ? 3 : 0.4}>
        {leftMenuOpen ? (
          <>
            <Paper variant="outlined" className="mt-1">
              <Tabs
                variant="fullWidth"
                value={selectedTab}
                onChange={(event, newValue) => {
                  setSelectedTab(newValue);
                  if (newValue === 'workflows') {
                    router.push(`/form/work-flow-diagram?tab=Responses`);
                  }
                }}
                aria-label="basic tabs example"
              >
                <Tab label="Forms" value="forms" />
                <Tab label="Workflows" value="workflows" />
                <Tooltip title="Minimise the menu">
                  <IconButton onClick={() => setLeftMenuOpen(false)}>
                    <ArrowBackIos />
                  </IconButton>
                </Tooltip>
              </Tabs>
            </Paper>
            <FormList
              hideHeader
              customLink={(form) => `/form/${form?.slug}?tab=Responses`}
              selectedForm={formSlug}
            />
          </>
        ) : (
          <>
            <Paper variant="outlined" className="mt-1" style={{ minHeight: '85vh' }}>
              <Tooltip title="Expand menu">
                <IconButton onClick={() => setLeftMenuOpen(true)}>
                  <ArrowForwardIos />
                </IconButton>
              </Tooltip>
            </Paper>
          </>
        )}
      </Grid>
      <Grid item xs={12} sm={leftMenuOpen ? 9 : 11.6}>
        <FeedWrapper showList={router.pathname === '/feed'} />
        {children}
      </Grid>
    </Grid>
  );
}
