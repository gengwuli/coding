class CreateDifficulties < ActiveRecord::Migration[5.1]
  def change
    create_table :difficulties do |t|
      t.string :level

      t.timestamps
    end
  end
end
