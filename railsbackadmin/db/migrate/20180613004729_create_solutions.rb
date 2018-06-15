class CreateSolutions < ActiveRecord::Migration[5.1]
  def change
    create_table :solutions do |t|
      t.text :solution
      t.references :problem, foreign_key: true
      t.references :language, foreign_key: true

      t.timestamps
    end
  end
end
