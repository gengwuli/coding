ActiveAdmin.register Problem do
# See permitted parameters documentation:
# https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
#
permit_params :problem_no ,:title ,:frequency ,:reference ,:appendix, :difficulty_id, :url, company_ids: [],
              category_ids: []
#
# or
#
# permit_params do
#   permitted = [:permitted, :attributes]
#   permitted << :other if params[:action] == 'create' && current_user.admin?
#   permitted
# end
  config.per_page = 50
  show do
    attributes_table do
      # %i(problem_no title frequency reference appendix).each do |name|
      #   row name
      # end
      row :problem_no
      row :title
      row :frequency
      row :reference
      row :appendix
      row :url
      table_for problem.categories.order('name ASC') do
        column :categories do |category|
          link_to category.name, [ :admin, category ]
        end
      end

      table_for problem.companies.order('name ASC') do
        column :companies do |company|
          link_to company.name, [ :admin, company ]
        end
      end

      table_for problem.solutions do
        column :solutions do |solution|
          link_to solution.language, [ :admin, solution ]
        end
      end

      row "difficulty" do |problem|
        link_to problem.difficulty, admin_difficulty_path(problem.difficulty)
      end
    end
  end

  form do |f|
    f.actions
    f.inputs 'Categories / Companies' do
      f.input :difficulty, :as => :select
      f.input :categories, :as => :check_boxes
      f.input :companies, :as => :check_boxes
      f.input :problem_no
      f.input :title
      f.input :frequency
      f.input :reference
      f.input :appendix
      f.input :url
    end
    f.actions
  end
end
