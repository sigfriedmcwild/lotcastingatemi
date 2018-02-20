import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import ContentAddCircle from 'material-ui-icons/AddCircle'

import QcAttackFields from './qcAttackFields.jsx'

import { createQcAttack, destroyQcAttack, updateQcAttack } from '../../ducks/actions.js'
import { fullQc, qcAttack } from '../../utils/propTypes'

class QcAttackEditor extends React.Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
  }

  handleChange(id, trait, value) {
    this.props.updateQcAttack(id, this.props.qc.id, trait, value)
  }

  handleAdd() {
    this.props.addQcAttack(this.props.qc.id)
  }

  handleRemove(id) {
    this.props.removeQcAttack(id, this.props.qc.id)
  }
  render() {
    const { handleChange, handleAdd, handleRemove } = this

    const qcAttacks = this.props.qc_attacks.map((attack) =>
      <QcAttackFields key={ attack.id } attack={ attack } qc={ this.props.qc }
        onAttackChange={ handleChange } onRemoveClick={ handleRemove }
      />
    )

    return <div>
      <Typography variant="subheading">
        Attacks
      </Typography>

      { qcAttacks }

      <Button variant="raised" onClick={ handleAdd }>
        Add Attack
        <ContentAddCircle  />
      </Button>
    </div>
  }
}
QcAttackEditor.propTypes = {
  qc: PropTypes.shape(fullQc),
  qc_attacks: PropTypes.arrayOf(PropTypes.shape(qcAttack)),
  updateQcAttack: PropTypes.func,
  addQcAttack: PropTypes.func,
  removeQcAttack: PropTypes.func,
}

function mapStateToProps(state, ownProps) {
  const qc = ownProps.qc
  let qc_attacks = []

  if (qc != undefined) {
    if (qc.qc_attacks != undefined) {
      qc_attacks = qc.qc_attacks.map((id) => state.entities.qc_attacks[id])
    }
  }

  return {
    qc_attacks
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateQcAttack: (id, qcId, trait, value) => {
      dispatch(updateQcAttack(id, qcId, 'Qc', trait, value))
    },
    addQcAttack: (qcId) => {
      dispatch(createQcAttack(qcId, 'Qc'))
    },
    removeQcAttack: (id, qcId) => {
      dispatch(destroyQcAttack(id, qcId, 'Qc'))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QcAttackEditor)