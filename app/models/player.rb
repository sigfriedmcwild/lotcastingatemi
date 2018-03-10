# frozen_string_literal: true

# User account.
class Player < ApplicationRecord
  has_many :identities, dependent: :destroy

  has_many :own_chronicles, class_name: 'Chronicle', foreign_key: 'st_id', inverse_of: :st, dependent: :destroy
  has_many :characters,   dependent: :destroy
  has_many :qcs,          dependent: :destroy
  has_many :battlegroups, dependent: :destroy

  has_many :chronicle_players, dependent: :destroy
  has_many :chronicles, through: :chronicle_players

  validates :email, uniqueness: true, email: true, allow_nil: true

  def all_chronicle_ids
    chronicle_ids + own_chronicle_ids
  end

  def token
    Knock::AuthToken.new(payload: { sub: id }).token
  end

  def entity_type
    'player'
  end

  def self.create_from_oauth(auth)
    create(
      display_name: auth['info']['name'],
      email: auth['info']['email']
    )
  end
end
