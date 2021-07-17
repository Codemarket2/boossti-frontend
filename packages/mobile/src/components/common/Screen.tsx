import React from 'react';
import { ViewStyle, StatusBar } from 'react-native';
import { ProgressBar, useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';

const StyledView = styled.View`
  padding: 10px;
  flex: 1;
  background-color: ${(props) => props.theme.colors.surface};
  padding-top: 0px;
`;

const StyledSafeAreaView = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props) => props.theme.colors.surface};
`;

interface IProps {
  children: React.ReactNode;
  safeArea?: boolean;
  style?: ViewStyle;
  barStyle?: 'light-content' | 'dark-content';
  barBackgroundColor?: string;
}

export default function Screen({
  children,
  safeArea = false,
  style = {},
  barStyle,
  barBackgroundColor,
}: IProps) {
  const { loading, darkMode } = useSelector(
    ({ loading, auth }: { loading: boolean; auth: any }) => ({
      loading,
      darkMode: auth.darkMode,
    }),
  );
  const theme = useTheme();
  const defaultColor = darkMode ? theme.colors.background : theme.colors.primary;
  if (safeArea) {
    return (
      <StyledSafeAreaView>
        <LoadingBarView
          loading={loading}
          style={style}
          barStyle={barStyle}
          barBackgroundColor={barBackgroundColor || defaultColor}
          loadingColor={theme.colors.accent}>
          {children}
        </LoadingBarView>
      </StyledSafeAreaView>
    );
  }
  return (
    <LoadingBarView
      loading={loading}
      style={style}
      barStyle={barStyle}
      barBackgroundColor={barBackgroundColor}
      loadingColor={theme.colors.accent}>
      {children}
    </LoadingBarView>
  );
}

interface ILoadingBarViewProps {
  children: React.ReactNode;
  loading: boolean;
  style?: ViewStyle;
  barStyle?: 'light-content' | 'dark-content';
  barBackgroundColor?: string;
  loadingColor?: string;
}

const LoadingBarWrapper = styled.View`
  min-height: 10px;
  background-color: ${(props) => props.theme.colors.surface};
`;

const LoadingBarView = ({
  style,
  children,
  loading,
  barStyle = 'light-content',
  barBackgroundColor,
  loadingColor = 'red',
}: ILoadingBarViewProps) => {
  return (
    <>
      <LoadingBarWrapper>
        <ProgressBar indeterminate={true} color={loadingColor} visible={loading} />
      </LoadingBarWrapper>
      <StatusBar barStyle={barStyle} backgroundColor={barBackgroundColor} />
      <StyledView style={style}>{children}</StyledView>
    </>
  );
};
