# frozen_string_literal: true

# Custom Attribute Exalts, for more flexibility than is allowed to Solars
class CustomAttributeCharacter < Character
  include AttributeExalt

  attribute :exalt_type, :string, default: 'Attribute Exalt'

  has_many :custom_attribute_charms, foreign_key: 'character_id', inverse_of: :character, dependent: :destroy
  alias_attribute :charms, :custom_attribute_charms

  def custom_exalt?
    true
  end
end
