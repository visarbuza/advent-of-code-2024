(* day1.ml *)

let () =
  let filename = "input.txt" in
  let ic = open_in filename in
  let rec read_lines acc =
    try
      let line = input_line ic in
      read_lines (line :: acc)
    with End_of_file ->
      close_in ic;
      List.rev acc
  in

  let lines = read_lines [] in
  let data = List.map (fun line ->
    let parts = Str.split (Str.regexp "[ \t]+") line in
    match List.map int_of_string parts with
    | [l; r] -> (l, r)
    | _ -> failwith "Each line must contain exactly two integers."
  ) lines in

  (* Extract left and right lists *)
  let left_side = List.map fst data in
  let right_side = List.map snd data in

  (* Sort both lists *)
  let left_sorted = List.sort compare left_side in
  let right_sorted = List.sort compare right_side in

  (* Calculate sum of absolute differences *)
  let sum =
    List.fold_left2 (fun acc l r -> acc + abs (l - r)) 0 left_sorted right_sorted
  in

  Printf.printf "%d\n" sum
