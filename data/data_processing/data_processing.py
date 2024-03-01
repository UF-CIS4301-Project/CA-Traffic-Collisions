import os  # for writing length outputs
import sqlite3


def find_attributes(output_path, database_path, database_table, columns):
    # Connect to SQLite database
    conn = sqlite3.connect(database_path)
    cursor = conn.cursor()

    # Open the output file in write mode
    with open(output_path, 'a') as file:
        print(f"-----------------Outputting values for table: {database_table}-----------------")
        file.write(f"--------------- Longest string lengths from {database_table} --------------\n")

        # Iterate over the selected columns and find the longest string in each and how many NULLs each column contains
        for column in columns:
            # Construct the SELECT query to find the maximum length of strings in the current column
            query_max_string_length = f"SELECT MAX(LENGTH({column})) FROM {database_table}"
            cursor.execute(query_max_string_length)
            longest_string_length = cursor.fetchone()[0]

            # Construct the SELECT query to count the number of NULL values in the current column
            query_null_value_count = f"SELECT COUNT(*) FROM {database_table} WHERE {column} IS NULL"
            cursor.execute(query_null_value_count)
            null_value_count = cursor.fetchone()[0]

            # Print the result
            print(f"Column: {column} | Longest String: {longest_string_length} | Number of nulls: {null_value_count}\n")

            # Write the result to the output file
            file.write(f"Column: {column} | Longest String: {longest_string_length} | Number of nulls: {null_value_count}\n")

        file.write('\n')  # newline at end of file

    # Close SQLite connection
    conn.close()


def column_attributes():
    # output data file path, make the output directory if it doesn't exist
    output_dir = 'output'
    result_file_path = os.path.join(output_dir, 'output.txt')
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    # Clear the output file
    open(result_file_path, 'w').close()

    # Define the traffic data input path
    traffic_data_path = 'input/california_traffic_collisions.sqlite'

    # Find the longest strings in each table
    selected_table = 'collisions'
    selected_columns = ["collision_severity", "pcf_violation_category", "county_location", "primary_road",
                        "statewide_vehicle_type_at_fault", "weather_1", "weather_2", "road_surface", "road_condition_1",
                        "road_condition_2", "lighting"]
    find_attributes(result_file_path, traffic_data_path, selected_table, selected_columns)

    selected_table = 'parties'
    selected_columns = ["vehicle_make", "party_race", "party_sex"]
    find_attributes(result_file_path, traffic_data_path, selected_table, selected_columns)

    selected_table = 'victims'
    selected_columns = ['victim_degree_of_injury']
    find_attributes(result_file_path, traffic_data_path, selected_table, selected_columns)


# main function of code
def main():
    column_attributes()


# this code is only meant to be executed from here, nowhere else
if __name__ == "__main__":
    main()
