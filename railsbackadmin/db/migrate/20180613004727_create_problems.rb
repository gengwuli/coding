class CreateProblems < ActiveRecord::Migration[5.1]
  def change
    create_table :problems do |t|
      t.integer :problem_no
      t.string :title
      t.string :frequency
      t.string :reference
      t.string :appendix
      t.string :url
      t.references :difficulty, foreign_key: true

      t.timestamps
    end
  end
end
