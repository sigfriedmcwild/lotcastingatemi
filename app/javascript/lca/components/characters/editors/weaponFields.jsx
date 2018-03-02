import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'
import Checkbox from 'material-ui/Checkbox'
import { FormControlLabel } from 'material-ui/Form'
import IconButton from 'material-ui/IconButton'
import TextField from 'material-ui/TextField'
import ContentRemoveCircle from 'material-ui-icons/RemoveCircle'

import WeaponAbilitySelect from './weaponAbilitySelect.jsx'
import WeaponAttributeSelect from './weaponAttributeSelect.jsx'
import WeightSelect from '../../generic/weightSelect.jsx'
import { fullWeapon } from '../../../utils/propTypes'

const styles = theme => ({
  fieldContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  nameField: {
    marginRight: theme.spacing.unit,
    flex: 1,
  },
  tagsField: {
    marginRight: theme.spacing.unit,
    flex: 1,
  },
  abilitySelect: {
    marginRight: theme.spacing.unit,
    width: '8em',
    textTransform: 'capitalize',
  },
})

/* TODO: handle ranged weapons properly
 * TODO: allow unusual weapons like that given by The Burning Name
 */
class WeaponFields extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      weapon: this.props.weapon
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleRatingChange = this.handleRatingChange.bind(this)
    this.handleCheck = this.handleCheck.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this)
  }

  componentWillReceiveProps(newProps) {
    this.setState({ weapon: newProps.weapon })
  }

  handleChange(e) {
    let { name, value } = e.target
    if (name == 'tags') {
      value = value.split(',')
    }

    this.setState({ weapon: { ...this.state.weapon, [name]: value }})
  }

  handleBlur(e) {
    let { name } = e.target
    const { weapon } = this.state
    if (weapon[name] == this.props.weapon[name])
      return

    this.props.onChange(weapon.id, name, weapon[name])
  }

  handleRatingChange(e) {
    let { name, value } = e.target
    const { weapon } = this.state
    if (value == 'header')
      return

    this.setState({ weapon: { ...weapon, [name]: value }})
    this.props.onChange(weapon.id, name, value)
  }

  handleCheck(e) {
    const { name } = e.target
    const { weapon } = this.state
    const value = ! weapon[name]

    this.props.onChange(weapon.id, name, value)
  }

  handleRemove() {
    this.props.onRemoveClick(this.state.weapon.id)
  }

  render() {
    const { weapon } = this.state
    const { character, classes } = this.props
    const { handleChange, handleBlur, handleRatingChange, handleCheck, handleRemove } = this

    return <div>
      <div className={ classes.fieldContainer }>
        <TextField name="name" value={ weapon.name } label="Name" className={ classes.nameField }
          onBlur={ handleBlur } onChange={ handleChange } margin="dense"
        />

        <WeightSelect name="weight" value={ weapon.weight }
          onChange={ handleRatingChange } margin="dense"
        />

        <FormControlLabel
          label="Artifact"
          control={
            <Checkbox name="is_artifact" checked={ weapon.is_artifact }
              onChange={ handleCheck }
            />
          }
        />

        <WeaponAttributeSelect character={ character } weapon={ weapon }
          onChange={ handleRatingChange }
        />

        <WeaponAbilitySelect character={ character } weapon={ weapon }
          onChange={ handleRatingChange }
        />

        <TextField label="tags" name="tags" value={ weapon.tags }
          className={ classes.tagsField } margin="dense"
          onBlur={ handleBlur } onChange={ handleChange }
        />
        <IconButton onClick={ handleRemove } style={{ minWidth: '2em' }}>
          <ContentRemoveCircle />
        </IconButton>
      </div>
    </div>
  }
}
WeaponFields.propTypes = {
  character: PropTypes.object.isRequired,
  weapon: PropTypes.shape(fullWeapon).isRequired,
  classes: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  onRemoveClick: PropTypes.func.isRequired,
}

export default withStyles(styles)(WeaponFields)