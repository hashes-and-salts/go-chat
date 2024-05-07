import { Box, Button, IconButton, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import LeftSidebar from '../layout/LeftSidebar'
import MainArea from '../layout/MainArea'
import PostCard from './components/PostCard'
import { Form, useNavigate } from 'react-router-dom'
import axios from 'axios'

interface UserPost {
  content: string,
  author: string,
  creationDate: string
}

const HomePage = () => {

  const navigateTo = useNavigate()

  const [post, setPost] = useState<UserPost>({
    content: "",
    author: "",
    creationDate: ""
  })

  const [userPosts, setUserPosts] = useState<UserPost[]>([])

  const handlePostClick = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    try {
      const response = await axios.post("/post/create", {
        content: post.content
      })

      setPost(prevPost => ({...prevPost, content:""}))
      navigateTo(0)

    } catch (e) {
      console.error(e)
    }

  }

  const getPosts = async () => {
    const response = await axios.get("/post/get")
    const posts: UserPost[] = response.data
    setUserPosts(posts)
  }

  useEffect(() => {
    getPosts()
  }, [])

  return (
    <>
    <LeftSidebar>

      <Typography variant="h6" padding={2} textAlign={"center"}>
        AppName?
      </Typography>

      <Form>
      <Box display={"flex"} flexDirection={"column"} p={2} gap={2}>
        {/* Create A Post */}
        <TextField
          variant="outlined"
          value={post.content}
          onChange={(e) => {setPost(prevPost => ({...prevPost, content: e.target.value}))}}
          label="Say Something..."
          maxRows={10}
          rows={7}
          multiline
        />

        {/* Text Formatting Buttons */}
        {/* <Box>
          <IconButton><b>B</b></IconButton>      
          <IconButton><u>U</u></IconButton>      
          <IconButton><i>i</i></IconButton>      
        </Box> */}

        <Button variant="contained" sx={{boxShadow: "none", height: 48}} onClick={handlePostClick} fullWidth
          type="submit"
        >
          Post
        </Button>
      </Box>
        </Form>

    </LeftSidebar>
    <MainArea>

      {
        userPosts?
        (<Box>
          {
            userPosts.map((userPost, index) => (
              <PostCard key={index} author={userPost.author} content={userPost.content} creationDate={userPost.creationDate}/>
            ))
          }
        </Box>
        ) : (
          <Box height={"100%"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <Typography variant="caption">create a post!</Typography>
          </Box>
        )
      }

    </MainArea>
    </>
  )
}

export default HomePage