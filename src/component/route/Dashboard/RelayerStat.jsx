import React from 'react'
import {
  Grid,
} from '@material-ui/core'
import { TabMap } from 'service/helper'
import TableControl from 'component/shared/TableControl'
import StatCard from './StatCard'
import TimeVolumeStat from './TimeVolumeStat'
/*
 * const StyledAvatar = withStyles(theme => ({
 *   root: {
 *     height: 60,
 *     width: 60,
 *     borderRadius: '50%',
 *     marginRight: 20,
 *   }
 * }))(Avatar) */

const TOPICS = new TabMap('Orders', 'Tokens')

export default class RelayerStat extends React.Component {
  state = {
    tab: TOPICS.orders,
  }

  onTabChange = (_, tab) => this.setState({ tab: TOPICS[tab] })

  render() {
    const {
      relayers: allRelayers,
      match,
    } = this.props

    const {
      tab,
    } = this.state

    const coinbase = match.params.coinbase
    const relayer = allRelayers[coinbase]

    return (
      <Grid container direction="column" spacing={4}>
        {/* <Grid item>
            <Box display="flex" alignItems="center">
            <Box>
            <StyledAvatar src={relayer.logo} alt={relayer.name} />
            </Box>
            <Box display="flex" flexDirection="column">
            <Box>
            <Typography variant="h6" className="mb-0">
            {relayer.name}
            </Typography>
            </Box>
            <Box>
            <StyledLink href={relayer.link} rel="noopener noreferrer" target="_blank">
            {relayer.link}
            </StyledLink>
            </Box>
            </Box>
            </Box>
            </Grid> */}
        <Grid item container spacing={3}>
          <Grid item sm={3} container direction="column" spacing={3}>
            <Grid item>
              <StatCard icon="https://picsum.photos/100/100" stat="1000" helpText="trades" />
            </Grid>
            <Grid item>
              <StatCard icon="https://picsum.photos/100/100" stat="1000" helpText="trades" />
            </Grid>
            <Grid item>
              <StatCard icon="https://picsum.photos/100/100" stat="1000" helpText="trades" />
            </Grid>
          </Grid>
          <Grid item sm={9}>
            <TimeVolumeStat />
          </Grid>
        </Grid>
        <Grid item>
          <TableControl tabValue={TOPICS.getIndex(tab)} onTabChange={this.onTabChange} topics={TOPICS.values} />
        </Grid>
        <Grid item>
          {relayer.name}
        </Grid>
      </Grid>
    )
  }
}
