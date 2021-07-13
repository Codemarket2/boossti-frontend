interface MenuItemProps {
  groupTitle: string;
  pages: Array<{ href: string; title: string }>;
}

interface MenuGroupProps {
  item: MenuItemProps;
}

interface PagesProps {
  landings: {
    title: string;
    id: string;
    children: {
      services: MenuItemProps;
      apps: MenuItemProps;
      web: MenuItemProps;
    };
  };
  pages: {
    title: string;
    id: string;
    children: {
      career: MenuItemProps;
      helpCenter: MenuItemProps;
      company: MenuItemProps;
      contact: MenuItemProps;
      blog: MenuItemProps;
      portfolio: MenuItemProps;
    };
  };
  account: {
    title: string;
    id: string;
    children: {
      settings: MenuItemProps;
      signup: MenuItemProps;
      signin: MenuItemProps;
      password: MenuItemProps;
      error: MenuItemProps;
    };
  };
}