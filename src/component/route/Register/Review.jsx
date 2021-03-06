import React from 'react'
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@material-ui/core'
import { round } from 'service/helper'
import { withStyles } from '@material-ui/core/styles'



const tableData = (meta, pairs) => {
  const fixPairList = pairs.map(p => p.toString().replace(' ', ''))
    .sort((a,b) => a.localeCompare(b))
    .join('   ')
  return [
    { key: 'Relayer Name', value: meta.name },
    { key: 'Coinbase', value: meta.coinbase },
    { key: 'Deposit', value: meta.deposit + ' TOMO' },
    { key: 'Trading Fee', value: round(meta.trade_fee, 2) + '%' },
    { key: `Trading Pairs # (${pairs.length})`, value: fixPairList },
  ]
}

const StyledTableCell = withStyles(theme => ({
  root: {
    border: 'none',
    paddingBottom: '10px',
  },
  body: {
    color: '#CFCDE1',
  },
  alignLeft: {
    color: '#7473A6',
  }

}))(TableCell)


const Review = ({
  meta,
  goBack,
  registerRelayer,
  isRegistering,
}) => {
  const pairs = document.__memoizedUserSelectedPairs__ || []
  return (
    <Box>
      <Typography variant="h5">
        Review
      </Typography>
      <Paper className="mt-1 p-1" elevation={0}>
        <Table>
          <TableBody>
            {tableData(meta, pairs).map(row => (
              <TableRow key={row.key}>
                <StyledTableCell>
                  {row.key.split('#').map((r, idx) => r !== '#' && <div key={idx}>{r}</div>)}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row.value}
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <Box display="flex" justifyContent="space-between" className="mt-2" alignItems="center">
        <Button color="secondary" variant="contained" type="button" onClick={goBack} disabled={isRegistering}>
          Back
        </Button>
        {isRegistering && (
          <Box display="flex" alignItems="center" className="pr-1">
            <span className="mr-1">Submitting...</span>
            <CircularProgress style={{ width: 20, height: 20 }}/>
          </Box>
        )}
        {!isRegistering && (
          <Button color="primary" variant="contained" type="button" onClick={registerRelayer} disabled={isRegistering}>
            Publish
          </Button>
        )}
      </Box>
    </Box>
  )
}

export default Review
