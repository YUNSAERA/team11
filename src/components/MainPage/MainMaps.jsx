import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getPosts } from '../../../supabase/post.api';
import { useNavigate } from 'react-router-dom';
import { StyledLogoDiv } from '../Navbar/StyledNavbar';
import MainMapTitle from './MainMapTitle';
import { useSelector } from 'react-redux';
import postsSlice from '../../redux/slice/postsSlice';

const StyledMainMapsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 20px auto;
  margin-top: 25px;
  width: 1500px;
  height: auto;
  flex-wrap: wrap;
`;

const StyledMapsBox = styled.div`
  width: 440px;
  height: 430px;
  border-radius: 15px;
  border: 1px solid #d9d9d9;
  box-sizing: border-box;
  margin-top: 25px;
  justify-content: center;
  align-items: center;
  text-align: center;
  transition: all 0.5s;
  cursor: pointer;
  flex: 0 1 30%;
  margin: 24px;

  &:hover {
    box-shadow: 0px 1px 5px #b9b9b9;
    scale: 1.12;
  }
`;

const StyledMapPhoto = styled.img`
  width: 400px;
  height: 250px;
  background-color: #d9d9d9;
  margin: 0 auto;
  margin-top: 20px;
  border-radius: 15px;
`;

const StyledSubHeading = styled.h3`
  font-size: 20px;
  font-weight: bold;
  margin-top: 25px;
  margin-left: 20px;
  text-align: left;
`;

const StyledSubContent = styled.p`
  font-size: 15px;
  color: #999;
  margin-top: 15px;
  margin-left: 20px;
  text-align: left;
`;

const StyledInformation = styled.p`
  font-size: 14px;
  color: #323232;
  float: right;
  margin-top: 15px;
  margin-right: 20px;
`;

function MainMaps() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const searchKeyword = useSelector((state) => state.postsSlice.postsData);

  console.log(searchKeyword);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <StyledLogoDiv></StyledLogoDiv>
      <MainMapTitle />

      <StyledMainMapsContainer>
        {posts
          .filter((post) => post.distance == null || post.distance <= 15)
          .map((post) => (
            <StyledMapsBox onClick={() => navigate(`/post-detail/${post.id}`)} key={post.id}>
              <StyledMapPhoto src={post.image} />
              <StyledSubHeading>{post.title}</StyledSubHeading>
              <StyledSubContent>{post.body}</StyledSubContent>
              <StyledInformation>
                {post.category} | {post.time}
              </StyledInformation>
            </StyledMapsBox>
          ))}
      </StyledMainMapsContainer>
    </>
  );
}

export default MainMaps;
