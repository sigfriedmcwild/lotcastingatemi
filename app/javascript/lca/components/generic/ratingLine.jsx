// @flow
import * as React from 'react'

import { withStyles } from '@material-ui/core/styles'

import RatingDots from './ratingDots.jsx'

const styles = theme => ({
  //eslint-disable-line no-unused-vars
  wrap: {
    display: 'flex',
    marginBottom: theme.spacing.unit / 2,
    marginTop: theme.spacing.unit / 2,
    flexWrap: 'wrap',
  },
  label: {
    flex: 1,
  },
})

type Props = {
  rating: number,
  fillTo?: number,
  dontFill?: boolean,
  merit?: boolean,
  children: React.Node,
  classes: Object,
}
function RatingLine({
  classes,
  children,
  rating,
  fillTo,
  dontFill,
  merit,
}: Props) {
  return (
    <div className={classes.wrap}>
      <div className={classes.label}>{children}</div>
      {merit && rating > 5 && <div className={classes.na}>N/A</div>}
      {!(merit && rating > 5) && (
        <RatingDots rating={rating} fillTo={fillTo} dontFill={dontFill} />
      )}
    </div>
  )
}

export default withStyles(styles)(RatingLine)
