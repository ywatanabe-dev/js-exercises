### 実装したソートアルゴリズム

今回実装したソートアルゴリズムは、クイックソートとよばれる手法である。
アルゴリズムの詳細は、以下の通り。ここで、ソートする配列を $A = [a_1, a_2, \dots, a_n]$ とし、ソートに使う比較用の関数を $compare(x, y)$ とする。また、下記アルゴリズムにより配列 $X$ をソートした結果を返す関数を $sort(X)$ とおく。

1. $A$ の要素が一つであればソート完了のため、そのまま $A$ を返す。それ以外は、2.に進む。

2. $A$ の要素のうち一つを選び出し、 $a_p$ とおく。

3. $A$ の $a_p$ を除く $A_{i \neq p}$ と、 $a_p$ の値から $compare(a_{i \neq p}, a_p) (a_{i \neq p} \in A_{i \neq p})$ の値をそれぞれ計算する。

4. $A_{i \neq p}$ のうち、 $compare(a_{i \neq p}, a_p) \leq 0$ となるものを集めた配列を $L = [l_1, l_2, \dots, l_j]$ 、 $compare(a_{i \neq p}, a_p) > 0$ となるものを集めた配列を $R = [r_1, r_2, \dots, r_k]$ とおく( $j + k = n - 1$ )。

5. $sort(A)$ の結果として、 $sort(L)$ 、 $a_p$ 、 $sort(R)$ をこの順に結合した配列を返す。

### クイックソートの時間計算量

上記のクイックソートの時間計算量には、様々な並びで与えられた配列に対して平均でかかる計算量と、最も多くの計算が必要になる場合の最悪の計算量がある。ここで、 $compare$ 関数が1回呼ばれるたび、計算量が1必要とおく。

#### 最悪計算量

最悪の計算量がかかる場合は、4.で行われる分割が、毎回 $L$ もしくは $R$ のどちらか全てに偏るような場合である(すなわち、片方が常に空配列になる場合)。この場合、 $n$ 個の配列をソートするのに必要な計算量を $P_n$ とおくと、

$$
\begin{equation}
\begin{split}
P_1 &= 0 \\
P_n &= n - 1 + P_{n-1}
\end{split}
\end{equation}
$$

よって、一般の $n$ に対して

$$
\begin{equation}
P_n = {1 \over 2} n (n - 1) = {n^{2} \over 2} - {n \over 2}
\end{equation}
$$

$P_n$ に対してオーダー $\mathcal{O}$ を取ると、

$$
\begin{equation}
\mathcal{O}(P_n) = \mathcal{O}\left({n^{2} \over 2} - {n \over 2}\right) = \mathcal{O}(n^{2})
\end{equation}
$$

以上より、クイックソートの最悪計算量は $\mathcal{O}(n^{2})$ である。

#### 平均計算量

上記の最悪の計算量の場合以外にも、4.ではいくつかの分割が起こりうる。それぞれの場合の計算量を列挙すると、

$$
\begin{equation}
\begin{split}
P_n &= n - 1 + P_0 + P_{n-1} \\
P_n &= n - 1 + P_1 + P_{n-2} \\
P_n &= n - 1 + P_2 + P_{n-3} \\
&\vdots \\
P_n &= n - 1 + P_{n-1} + P_{0} \\
\end{split}
\end{equation}
$$

それぞれの分割が等確率で発生すると仮定すると、上記の計算量の平均 $\overline{P_n}$ は

$$
\begin{equation}
\overline{P_n} = n - 1 + {2 \over n} \sum_{i=0}^{n-1} \overline{P_i}
\end{equation}
$$

両辺に $n$ を掛けると、

$$
\begin{equation}
n \overline{P_n} = n(n - 1) + 2 \sum_{i=0}^{n-1} \overline{P_i}
\end{equation}
$$

よって、

$$
\begin{equation}
(n - 1) \overline{P_{n-1}} = (n - 1)(n - 2) + 2 \sum_{i=0}^{n-2} \overline{P_i}
\end{equation}
$$

両者の差を取ると、

$$
\begin{equation}
n \overline{P_n} - (n - 1) \overline{P_{n-1}} = 2n - 2 + 2 \overline{P_{n-1}}
\end{equation}
$$

簡単にすると、

$$
\begin{equation}
n \overline{P_n} - (n + 1) \overline{P_{n-1}} = 2n - 2
\end{equation}
$$

ここで、 $\overline{P_{n}} = Q_n + 2$ とおくと、

$$
\begin{equation}
\begin{split}
n (Q_n + 2) - (n + 1)(Q_{n-1} + 2) = 2n - 2 \\
n Q_n - (n + 1)Q_{n-1} = 2n \\
{Q_n \over n + 1} - {Q_{n-1} \over n} = {2 \over n + 1}
\end{split}
\end{equation}
$$

よって、 $n$ の値を変えると、以下が成り立つ。

$$
\begin{equation}
\begin{split}
{Q_n \over n + 1} - {Q_{n-1} \over n} &= {2 \over n + 1} \\
{Q_{n-1} \over n} - {Q_{n-2} \over n - 1} &= {2 \over n} \\
{Q_{n-2} \over n - 1} - {Q_{n-3} \over n - 2} &= {2 \over n - 1} \\
&\vdots \\
{Q_2 \over 3} - {Q_1 \over 2} &= {2 \over 3} \\
\end{split}
\end{equation}
$$

これらを全て足し合わせると、

$$
\begin{equation}
{Q_n \over n + 1} - {Q_1 \over 2} = 2\sum_{i=2}^{n} {1 \over i + 1}
\end{equation}
$$

$Q_1 = \overline{P_1} - 2 = -2$ から、

$$
\begin{equation}
\begin{split}
{Q_n \over n + 1} &= 2\sum_{i=2}^{n} {1 \over i + 1} - 1 \\
&= {2 \over n + 1} + 2\sum_{i=1}^{n} {1 \over i} - 4
\end{split}
\end{equation}
$$

よって、一般の $n$ について

$$
\begin{equation}
\begin{split}
Q_n = 2 (n + 1) \left(\sum_{i=1}^{n} {1 \over i} - 2\right) + 2 \\
\overline{P_n} = 2 (n + 1) \left(\sum_{i=1}^{n} {1 \over i} - 2\right) + 4
\end{split}
\end{equation}
$$

ここで、全ての $n$ に対し、 $\sum_{i=1}^{n} {1 \over i} < 1 + \log n$ が成り立つことを用いると、

$$
\begin{equation}
\mathcal{O}\left(\sum_{i=1}^{n} {1 \over i} - 2\right) = \mathcal{O}(\log n - 1) = \mathcal{O}(\log n)
\end{equation}
$$

ゆえに、

$$
\begin{equation}
\mathcal{O}(\overline{P_n}) = \mathcal{O}(n\log n)
\end{equation}
$$

以上より、クイックソートの平均計算量は $\mathcal{O}(n\log n)$ である。

参考文献：http://www3.u-toyama.ac.jp/math/algorithm/9.handout.pdf
