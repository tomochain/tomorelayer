import React from 'react'
import {
  Grid,
  IconButton,
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import FirstPageIcon from '@material-ui/icons/FirstPage'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import LastPageIcon from '@material-ui/icons/LastPage'
import { sequence } from 'service/helper'

const PageNumItem = withStyles(theme => ({
  root: {
    cursor: 'pointer',
    '&:hover, &.page-active': {
      color: 'white',
    }
  }
}))(Grid)

const iconStyles = (theme) => ({
  root: {
    color: theme.palette.subtitle,
    '&:hover': {
      color: 'white',
    },
  },
})

const FirstPageIconStyled = withStyles(iconStyles)(FirstPageIcon)
const LastPageIconStyled = withStyles(iconStyles)(LastPageIcon)
const KeyboardArrowLeftStyled = withStyles(iconStyles)(KeyboardArrowLeft)
const KeyboardArrowRightStyled = withStyles(iconStyles)(KeyboardArrowRight)

const renderPageNumItem = (current, total, onPageClick) => {
  const numberRender = (numberList) => numberList.map((idx) => (
    <PageNumItem item key={idx} className={idx === current ? 'page-active' : ''} onClick={() => onPageClick(idx)}>
      {idx}
    </PageNumItem>
  ))

  if (current < 3) {
    const nums = sequence(1, Math.min(4, total + 1))
    return (
      <React.Fragment>
        {numberRender(nums)}
        {total > 4 && (
          <Grid item style={{ letterSpacing: 2 }}>
            ...
          </Grid>
        )}
      </React.Fragment>
    )
  }

  if (current >= 3) {
    const nums = sequence(current - 1, Math.min(current + 2, total + 1))
    return (
      <React.Fragment>
        <Grid item style={{ letterSpacing: 2 }}>
          ...
        </Grid>
        {numberRender(nums)}
        {total > (current + 1) && (
          <Grid item style={{ letterSpacing: 2 }}>
            ...
          </Grid>
        )}
      </React.Fragment>
    )
  }
}


const Paginator = ({
  rowsPerPage,
  activePage,
  totalPages,
  onNext,
  onPrev,
  onBegin,
  onEnd,
  onPageClick,
}) => {

  return (
    <Grid container spacing={4} justify="center" alignItems="center" className="mt-1">
      <IconButton
        onClick={onBegin}
        disabled={activePage <= 1}
        aria-label="first page"
      >
        <FirstPageIconStyled />
      </IconButton>
      <IconButton onClick={onPrev} disabled={activePage <= 1} aria-label="previous page">
        <KeyboardArrowLeftStyled />
      </IconButton>
      {renderPageNumItem(activePage, totalPages, onPageClick)}
      <IconButton onClick={onNext} disabled={activePage >= totalPages} aria-label="next page">
        <KeyboardArrowRightStyled />
      </IconButton>
      <IconButton
        onClick={onEnd}
        disabled={activePage >= totalPages}
        aria-label="last page"
      >
        <LastPageIconStyled />
      </IconButton>
    </Grid>
  )
}

export default Paginator
