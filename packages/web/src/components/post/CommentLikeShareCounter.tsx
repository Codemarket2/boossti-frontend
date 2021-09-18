import React from 'react';
import { Container, Link } from '@material-ui/core';
import styled from 'styled-components';

import { useGetLikes } from '@frontend/shared/hooks/like/getLike';
import { useGetCommentCount } from '@frontend/shared/hooks/comment/getComment';
import ErrorLoading from '../common/ErrorLoading';

const StyledContainer = styled(Container)`
  display: flex !important;
  flex-direction: row !important;
`;

const StyledPara = styled.p`
  margin-right: 10px;
`;

interface IProps {
  parentId: string;
  toggleCommentSection: any;
}
export default function CommentLikeShareCounter({ parentId, toggleCommentSection }: IProps) {
  const { data: likeData, error: likeError } = useGetLikes(parentId);
  const { data, error, loading } = useGetCommentCount(parentId);

  return (
    <StyledContainer>
      <StyledPara>
        {!likeData || !likeData!.getLikesByParentId!.data || likeError ? (
          <ErrorLoading error={likeError} />
        ) : (
          <Link component="button" variant="body2">
            Like {likeData && likeData!.getLikesByParentId!.data.length}
          </Link>
        )}
      </StyledPara>
      <StyledPara>
        {error || !data || !data.getCommentCount ? (
          <ErrorLoading error={error} />
        ) : (
          <Link component="button" variant="body2" onClick={toggleCommentSection}>
            Comment {data!.getCommentCount!.count}
          </Link>
        )}
      </StyledPara>
      <StyledPara>
        <Link component="button" variant="body2">
          Share
        </Link>
      </StyledPara>
    </StyledContainer>
  );
}
