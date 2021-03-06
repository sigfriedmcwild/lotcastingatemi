// @flow
import * as React from 'react'
const { Component, Fragment } = React
import DocumentTitle from 'react-document-title'
import { connect } from 'react-redux'
import { SortableElement } from 'react-sortable-hoc'

import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import Typography from '@material-ui/core/Typography'
import ContentAddCircle from '@material-ui/icons/AddCircle'

import MeritFields from './MeritFields.jsx'
import SortableGridList from 'components/generic/SortableGridList.jsx'

import ProtectedComponent from 'containers/ProtectedComponent.jsx'
import { updateMerit, createMerit, destroyMerit } from 'ducks/actions.js'
import { getSpecificCharacter, getMeritsForCharacter } from 'selectors'
import type { Character, fullMerit as Merit } from 'utils/flow-types'

const SortableItem = SortableElement(({ children }) => children)

/* LATER: possible autocomplete for merits in the book with merit_name, cat, and
 * ref pre-filled
 * TODO:  See how kosher something like above would be
 * */
type Props = {
  character: Character,
  merits: Array<Merit>,
  updateMerit: Function,
  destroyMerit: Function,
  createMerit: Function,
}
class MeritEditor extends Component<Props> {
  handleUpdate = (id, charId, trait, value) => {
    this.props.updateMerit(id, charId, trait, value)
  }

  handleAdd = () => {
    this.props.createMerit(this.props.character.id)
  }

  handleRemove = id => {
    this.props.destroyMerit(id, this.props.character.id)
  }

  handleSort = ({ oldIndex, newIndex }) => {
    if (oldIndex === newIndex) return
    const meritA = this.props.merits[oldIndex]
    const meritB = this.props.merits[newIndex]
    const offset = meritA.sort_order > meritB.sort_order ? -1 : 1
    this.props.updateMerit(
      meritA.id,
      this.props.character.id,
      'sort_order',
      meritB.sort_order + offset
    )
  }

  render() {
    /* Escape hatch */
    if (this.props.character == undefined)
      return (
        <div>
          <Typography paragraph>This Character has not yet loaded.</Typography>
        </div>
      )

    const { handleAdd, handleRemove, handleSort } = this
    const { updateMerit } = this.props

    const mts = this.props.merits.map((m, i) => (
      <SortableItem key={m.id} index={i}>
        <Grid item key={m.id} xs={12} md={6} xl={4}>
          <MeritFields
            merit={m}
            character={this.props.character}
            onUpdate={updateMerit}
            onRemove={handleRemove}
          />
        </Grid>
      </SortableItem>
    ))

    return (
      <Fragment>
        <DocumentTitle
          title={`${this.props.character.name} Merits | Lot-Casting Atemi`}
        />

        <Hidden smUp>
          <div style={{ height: '1.5em' }}>&nbsp;</div>
        </Hidden>

        <SortableGridList
          header={
            <Typography variant="headline">
              Merits &nbsp;&nbsp;
              <Button onClick={handleAdd}>
                Add Merit&nbsp;
                <ContentAddCircle />
              </Button>
            </Typography>
          }
          items={mts}
          classes={{}}
          onSortEnd={handleSort}
          useDragHandle={true}
          axis="xy"
        />
      </Fragment>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const id = ownProps.match.params.characterId
  const character = getSpecificCharacter(state, id)
  let merits = []

  if (character != undefined && character.merits != undefined) {
    merits = getMeritsForCharacter(state, id)
  }

  return {
    character,
    merits,
  }
}

export default ProtectedComponent(
  connect(
    mapStateToProps,
    { updateMerit, destroyMerit, createMerit }
  )(MeritEditor)
)
