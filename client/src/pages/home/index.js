import { Box, Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { Navigate } from "react-router-dom";
import CardResultGraphics from "../../components/dashboard/cards/CardResultGraphics";

import CardTaskProgress from "../../components/dashboard/cards/CardTaskProgress";
import CardItemsList from '../../components/dashboard/cards/CardTestsList';
import CardDiagramProgress from "../../components/dashboard/cards/CardDiagramProgress";
import UserService from "../../services/user.service";
import eventBus from "../../common/EventBus";

const Home = (props) => {
    const { user: currentUser } = props;
    const [tests, setTests] = useState(null);

    useEffect(() => {
        UserService.getTests()
            .then(res => {
                let data = [];
                res.forEach(item => {
                    data.push(item);
                });
                setTests(data);
            }, err => {
                if (err.response && err.response.status === 403) {
                    eventBus.dispatch("logout");
                }
            });
    }, []);

    if (!currentUser) {
        return <Navigate to={"/signin"} />;
    }

    return (
        <Box 
            component="main"
            sx={{
                flexGrow: 1,
                py: 8
            }}
        >   
        {
            console.log(tests)
        }
            <Container 
                maxWidth={false}
            >
                <Grid 
                    container
                    spacing={3}
                >
                    <Grid 
                        item
                        lg={8}
                        md={12}
                        xl={9}
                        xs={12}
                    >
                        <CardItemsList />
                    </Grid>
                    <Grid 
                        item
                        lg={4}
                        sm={6}
                        xl={3}
                        xs={12}
                    >
                       <CardTaskProgress /> 
                    </Grid>
                    <Grid 
                        item
                        lg={12}
                        md={6}
                        xl={3}
                        xs={12}
                    >
                        <CardDiagramProgress />
                    </Grid>
                    <Grid 
                        item
                        lg={12}
                        md={12}
                        xl={9}
                        xs={12}
                    >
                        <CardResultGraphics />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

function mapStateToProps(state) {
    const { user } = state.auth;
    return {
      user,
    };
  }
  
  export default connect(mapStateToProps)(Home);