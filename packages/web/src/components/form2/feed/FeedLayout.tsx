import ArrowBackIos from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import Grid from '@mui/material/Grid';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useRouter } from 'next/router';
import React, { ReactNode, useEffect, useState } from 'react';
import FormList from '../FormList';

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
    } else {
      setFormSlug('');
    }
  }, [router.query?.form]);

  useEffect(() => {
    if (router.pathname === '/workflow/[slug]') {
      setSelectedTab('workflows');
    }
  }, [router.pathname]);

  return (
    <Grid container spacing={0.5}>
      <Grid item xs={12} sm={leftMenuOpen ? 3 : 0.4}>
        {leftMenuOpen ? (
          <>
            <Paper variant="outlined" className="mt-1">
              <Tabs
                variant="fullWidth"
                value={selectedTab}
                onChange={(event, newValue) => setSelectedTab(newValue)}
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
              customLink={(form) =>
                `/${selectedTab === 'workflows' ? 'workflow' : 'form'}/${form?.slug}${
                  selectedTab === 'workflows' ? '' : '?tab=Responses'
                }`
              }
              selectedForm={formSlug}
              isWorkflow={selectedTab === 'workflows'}
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
        {children}
      </Grid>
    </Grid>
  );
}
