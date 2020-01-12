def get_schedule(teams, scout_records, total_priority, prefs):
    # Check for 6 scouts
    if len(scout_records) < 6:
        return "Error - needs 6 scouts"

    # Add ids and totals to scout records array
    for i in range(len(scout_records)):
        scout_records[i]['id'] = i

    # Update scout records array (to add teams)
    for i in range(len(scout_records)):
        for teamnumber in range(len(teams)):
            if teams[teamnumber] not in scout_records[i].keys():
                scout_records[i][teams[teamnumber]] = 0

    # Update from prefs
    for team, scout in prefs.items():
        scout_records[scout][team] = 99999

    # Create priority lists
    def priority_list(team):
        sorted_scouts = []
        for i in range(len(scout_records)):
            sorted_scouts.append({"id": scout_records[i]['id'], "priority": float(scout_records[i][team]) - float(
                scout_records[i]['total'])*(total_priority), "total": scout_records[i]['total']})
        sorted_scouts = sorted(
            sorted_scouts, key=lambda x: (-x['priority'], x['total']))
        temp_output = []
        for i in range(len(sorted_scouts)):
            temp_output.append(sorted_scouts[i]['id'])
        return temp_output

    # Create match schedule
    scheduled = {}

    # Generate priority lists
    priority_lists = {}
    for teamnumber in range(6):
        priority_lists[teams[teamnumber]] = priority_list(
            team=teams[teamnumber])

    # Function for removing a scout from priority lists (once assigned)
    def remove_from_priority(scout):
        for team, list in priority_lists.items():
            while scout in priority_lists[team]:
                priority_lists[team].remove(scout)

    # Function for one cycle of assignments
    def assign_scouts():
        # Generate lists of scout requests
        scout_requests = []
        for i in range(len(scout_records)):
            scout_requests.append([])
        for team, list in priority_lists.items():
            if len(list) > 0:
                scout_requests[priority_lists[team][0]].append(team)

        # Iterate through scout requests (resolving conflicts when neccessary)
        for scout_request_number in range(len(scout_requests)):
            if len(scout_requests[scout_request_number]) == 1:
                # No conflict (scout requested by one team)
                scheduled[scout_requests[scout_request_number][0]
                          ] = scout_request_number  # Add to schedule
                # Clear priority list for team
                priority_lists[scout_requests[scout_request_number][0]] = []
                # Remove scout from priority lists (so cannot be selected for another team)
                remove_from_priority(scout=scout_request_number)
            elif len(scout_requests[scout_request_number]) > 1:
                # Conflict found (scout requested by multiple teams)
                # Resolved by comparing potential 'loss of experience' if each team used secondary scout
                comparison_data = []
                for i in range(len(scout_requests[scout_request_number])):
                    first_value = scout_records[priority_lists[scout_requests[scout_request_number]
                                                               [i]][0]][scout_requests[scout_request_number][i]]
                    first_value -= float(
                        scout_records[priority_lists[scout_requests[scout_request_number][i]][0]]['total'])*total_priority
                    second_value = scout_records[priority_lists[scout_requests[scout_request_number]
                                                                [i]][1]][scout_requests[scout_request_number][i]]
                    second_value -= float(
                        scout_records[priority_lists[scout_requests[scout_request_number][i]][1]]['total'])*total_priority
                    # Find difference between experience of primary and secondary scout
                    comparison_data.append(first_value - second_value)

                maxid = 0
                for i in range(len(comparison_data)):
                    if comparison_data[i] > comparison_data[maxid]:
                        maxid = i
                scheduled[scout_requests[scout_request_number][maxid]
                          ] = scout_request_number  # Add to schedule
                # Clear priority list for team
                priority_lists[scout_requests[scout_request_number][maxid]] = []
                # Remove scout from priority lists (so cannot be selected for another team)
                remove_from_priority(scout=scout_request_number)

    # Run cycles of assignment until schedule created
    while len(scheduled) < 6:
        assign_scouts()

    # Update with scout names
    for team, scoutnumber in scheduled.items():
        scheduled[team] = scout_records[scoutnumber]["name"]

    return scheduled