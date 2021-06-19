import React from 'react';
import styled from 'styled-components/native';
import { ViewStyle, StatusBar } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { useSelector } from 'react-redux';

const StyledView = styled.View`
  padding: 10px;
  flex: 1;
  background-color: white;
  padding-top: 0px;
`;

const StyledSafeAreaView = styled.SafeAreaView`
  flex: 1;
  background-color: white;
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
  const loading = useSelector(({ loading }: { loading: boolean }) => loading);
  if (safeArea) {
    return (
      <StyledSafeAreaView>
        <LoadingBarView
          loading={loading}
          style={style}
          barStyle={barStyle}
          barBackgroundColor={barBackgroundColor}>
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
      barBackgroundColor={barBackgroundColor}>
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
}

const LoadingBarWrapper = styled.View`
  min-height: 10px;
  background-color: white;
`;

const LoadingBarView = ({
  style,
  children,
  loading,
  barStyle = 'light-content',
  barBackgroundColor = '#6200EE',
}: ILoadingBarViewProps) => {
  return (
    <>
      <LoadingBarWrapper>
        <ProgressBar indeterminate={true} color="red" visible={loading} />
      </LoadingBarWrapper>
      <StatusBar barStyle={barStyle} backgroundColor={barBackgroundColor} />
      <StyledView style={style}>{children}</StyledView>
    </>
  );
};
