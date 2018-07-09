# Array Visualize
```scala
object Solution {
	def binarySearch(arr: Array[Int], target: Int):Int = {
		var (l, r) = (0, arr.length - 1)
		while (l <= r) {
			val m = l + (r - l) / 2
			println(arr.mkString("[",",","]") + "|" + s"""[["l",0,$l],["r",0,$r],["m",0,$m]]""" + "|" + s"[[0,$l],[0,$m],[0,$r]]")
			if (arr(m) == target) {
				return m
			}
			if (arr(m) < target) {
				l = m + 1
			} else {
				r = m - 1
			}
		}
		-1
	}	
}

val arr = Array(1,2,3,4,5,6,7,8,9)
Solution.binarySearch(arr, 9)

[1,2,3,4,5,6,7,8,9]|[["l",0,0],["r",0,8],["m",0,4]]|[[0,0],[0,4],[0,8]]
[1,2,3,4,5,6,7,8,9]|[["l",0,5],["r",0,8],["m",0,6]]|[[0,5],[0,6],[0,8]]
[1,2,3,4,5,6,7,8,9]|[["l",0,7],["r",0,8],["m",0,7]]|[[0,7],[0,7],[0,8]]
[1,2,3,4,5,6,7,8,9]|[["l",0,8],["r",0,8],["m",0,8]]|[[0,8],[0,8],[0,8]]
```

for list use
`[1,2,3,4]|{"ptrs":[[0,"p"],[1,"q"]],"ops":[{"swap":[1,2]},{"insert":[2,10]},{"delete":3}]}`
